import { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { useEffect } from "react";
import Router from "next/router";
import { toTitleCase } from "@/utils";

function UploadExcel() {
  const [csvData, setCsvData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Load categories
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  function handleCsvUpload(ev) {
    const files = ev.target.files; // Get all selected files
    if (!files.length) return;

    setIsUploading(true);

    const allCsvData = [];

    // Use a Promise to handle all file parsing asynchronously
    const parsePromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            allCsvData.push(...results.data); // Merge data from each file
            resolve();
          },
          error: function (error) {
            console.error("Error parsing CSV:", error);
            reject(error);
          },
        });
      });
    });

    // Wait for all files to be parsed
    Promise.all(parsePromises)
      .then(() => {
        setCsvData(allCsvData); // Set combined data to state
        setIsUploading(false);
      })
      .catch((error) => {
        console.error("Error parsing files:", error);
        setIsUploading(false);
      });
  }

async function saveProductsFromCsv() {
  if (categories.length === 0) {
    alert("Categories are not loaded yet. Please try again in a moment.");
    return;
  }

  const productsToUpload = [];

  for (const row of csvData) {
    const {
      name,
      REF,
      category: categoryName,
      description,
      details,
      price,
      ...dynamicProperties
    } = row;

    console.log("Row:", row);

    // Find the category object by name
    const categoryObject = categories.find(
      (c) => c.name === categoryName.trim()
    );

    if (!categoryObject) {
      console.error(`Category "${categoryName}" not found in database.`);
      alert(
        `Category "${categoryName}" not found. Product "${name}" was not added.`
      );
      continue;
    }

    const categoryId = categoryObject._id;

    const properties = {};
    for (const [key, value] of Object.entries(dynamicProperties)) {
      if (value) {
        properties[key] = value;
      }
    }

    const propertyCombinations = Object.keys(properties).reduce((acc, key) => {
      const values = properties[key].includes(",") ? properties[key].split(",") : [properties[key.trim()]];
      if (acc.length === 0) {
        return values.map((v) => ({ [toTitleCase(key).trim()]: toTitleCase(v).trim() }));
      }

      const newCombinations = [];
      for (const accItem of acc) {
        for (const value of values) {
          newCombinations.push({
            ...accItem,
            [toTitleCase(key).trim()]: toTitleCase(value).trim(),
          });
        }
      }

      return newCombinations;
    }, []);

    for (const combination of propertyCombinations) {
      const product = {
        name: `${REF}-${name} (${Object.values(combination).join(", ")})`,
        reference: REF,
        category: categoryId,
        description,
        details,
        price: parseFloat(price),
        properties: combination,
      };

      productsToUpload.push(product);
      console.log("Product:", product);
    }
  }

  if (productsToUpload.length === 0) {  
    alert("No products to upload.");
    return;
  }

  try {
    await axios.post("/api/products", { products: productsToUpload });
    alert("All products from CSV have been added!");
    Router.push("/products");
  } catch (error) {
    console.error("Error uploading products:", error);
    alert("Failed to upload products. Please try again.");
  }
}


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Upload Products via Excel</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Excel File
          </label>
          <input
            type="file"
            accept=".csv"
            multiple
            onChange={handleCsvUpload}
            className="mt-1 block w-full"
          />
        </div>

        {csvData.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <table className="basic">
              <thead>
                <tr>
                  {Object.keys(csvData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={saveProductsFromCsv}
          disabled={isUploading || csvData.length === 0}
          className="btn-primary"
        >
          Save Products
        </button>
      </div>
    </div>
  );
}

export default UploadExcel;