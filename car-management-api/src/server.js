import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
  }),
);

const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data_path = path.join(__dirname, "../data/cars.json");

app.use(express.json());

// Read JSON data
const get_cars = () => {
  const data = fs.readFileSync(data_path, "utf-8");

  return JSON.parse(data);
};

// Write JSON data
const save_cars = (cars) => {
  fs.writeFileSync(data_path, JSON.stringify(cars, null, 2));
};

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Car Management API",
  });
});

// Get all cars
app.get("/api/cars", (req, res) => {
  const cars = get_cars();

  res.status(200).json(cars);
});

// Get single car
app.get("/api/cars/:id", (req, res) => {
  const cars = get_cars();

  const car = cars.find((item) => item.id === Number(req.params.id));

  if (!car) {
    return res.status(404).json({
      message: "Car not found",
    });
  }

  res.status(200).json(car);
});

// Add new car
app.post("/api/cars", (req, res) => {
  const cars = get_cars();

  const new_car = {
    id: cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1,
    ...req.body,
  };

  cars.push(new_car);

  save_cars(cars);

  res.status(201).json({
    message: "Car added successfully",
    data: new_car,
  });
});

// Update car
app.put("/api/cars/:id", (req, res) => {
  const cars = get_cars();

  const car_index = cars.findIndex((item) => item.id === Number(req.params.id));

  if (car_index === -1) {
    return res.status(404).json({
      message: "Car not found",
    });
  }

  cars[car_index] = {
    ...cars[car_index],
    ...req.body,
    id: cars[car_index].id,
  };

  save_cars(cars);

  res.status(200).json({
    message: "Car updated successfully",
    data: cars[car_index],
  });
});

// Delete car
app.delete("/api/cars/:id", (req, res) => {
  const cars = get_cars();

  const updated_cars = cars.filter((item) => item.id !== Number(req.params.id));

  if (cars.length === updated_cars.length) {
    return res.status(404).json({
      message: "Car not found",
    });
  }

  save_cars(updated_cars);

  res.status(200).json({
    message: "Car deleted successfully",
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
