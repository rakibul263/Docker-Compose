import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [cars, set_cars] = useState([]);
  const [loading, set_loading] = useState(true);

  const fetch_cars = async () => {
    try {
      const response = await fetch(`${API_URL}/cars`);
      const data = await response.json();

      set_cars(data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    fetch_cars();
  }, []);

  const total_value = cars.reduce((total, car) => total + car.price, 0);

  const electric_cars = cars.filter(
    (car) => car.fuel_type === "Electric",
  ).length;

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Car Management</h1>

        <p className="mt-2 text-gray-500">Manage your vehicle inventory</p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Cars</p>
          <h2 className="mt-2 text-3xl font-bold">{cars.length}</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Electric Cars</p>
          <h2 className="mt-2 text-3xl font-bold">{electric_cars}</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Inventory Value</p>
          <h2 className="mt-2 text-3xl font-bold">
            ${total_value.toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold">All Vehicles</h2>

        {loading ? (
          <p>Loading cars...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="p-3">Brand</th>
                  <th className="p-3">Model</th>
                  <th className="p-3">Year</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Fuel</th>
                  <th className="p-3">Price</th>
                </tr>
              </thead>

              <tbody>
                {cars.map((car) => (
                  <tr key={car.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{car.brand}</td>

                    <td className="p-3">{car.model}</td>

                    <td className="p-3">{car.year}</td>

                    <td className="p-3">{car.color}</td>

                    <td className="p-3">{car.fuel_type}</td>

                    <td className="p-3 font-medium">
                      ${car.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!cars.length && (
              <p className="py-8 text-center text-gray-500">No cars found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
