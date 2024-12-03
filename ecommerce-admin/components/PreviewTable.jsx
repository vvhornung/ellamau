const PreviewTable = ({ data }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Preview (All Combinations)</h2>
      <table className="basic">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Properties</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.category}</td>
              <td>
                {Object.entries(row.properties)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviewTable;
