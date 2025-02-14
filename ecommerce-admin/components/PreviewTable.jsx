const PreviewTable = ({ data }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Preview (Products to be created)
      </h2>
      <table className="basic">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reference</th>
            <th>Category</th>
            <th>Price</th>
            <th>Variants Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.reference}</td>
              <td>{row.category}</td>
              <td>${row.price}</td>
              <td>{row.variants?.length || 0} combinations</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviewTable;
