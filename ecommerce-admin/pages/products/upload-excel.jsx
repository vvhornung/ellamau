import { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { useEffect } from "react";
import Router from "next/router";

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
      // Create a new object with trimmed keys to ensure consistent property access
      const trimmedRow = Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key.trim(), value])
      );

      const {
        REF,
        name: baseProductName,
        description,
        details,
        color,
        size,
        price,
        category: categoryName,
      } = trimmedRow;

      // Standardize category name
      const standardizedCategoryName = categoryName?.toLowerCase().trim();

      // Find or create the category
      let categoryObject = categories.find(
        (c) => c.name.trim() === standardizedCategoryName
      );

      if (!categoryObject) {
        try {
          const response = await axios.post("/api/categories", {
            name: standardizedCategoryName,
          });
          categoryObject = response.data;
          setCategories((prev) => [...prev, categoryObject]);
        } catch (error) {
          console.error(
            `Failed to create category "${standardizedCategoryName}" from ROW ${JSON.stringify(
              row
            )}:`,
            error
          );
          alert(
            `Failed to create category "${standardizedCategoryName}". Product "${baseProductName}" was not added.`
          );
          continue;
        }
      }

      let product = {
        name: REF + "-" + baseProductName,
        reference: REF,
        category: categoryObject._id,
        description,
        details: details.split(";").map((detail) => detail.trim()),
        price: parseFloat(price),
        images: [
      
        ],
      };

      // Check if product has variants (if size field exists)
      if (size) {
        // Split colors and sizes into arrays
        const colors = color.split(",").map((c) => c.trim());
        const sizes = size.split(",").map((s) => s.trim());

        // Create variants array
        const variants = [];
        for (const currentColor of colors) {
          for (const currentSize of sizes) {
            variants.push({
              color: currentColor,
              size: currentSize,
              stock: 0,
              images: [
                "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
              ],
            });
          }
        }
        product.variants = variants;
      } else {
        // For products without variants, add color as a single variant
        product.variants = [
          {
            color: color,
            size: "unique",
            stock: 0,
            images: [
              "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
            ],
          },
        ];
      }

      productsToUpload.push(product);
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
