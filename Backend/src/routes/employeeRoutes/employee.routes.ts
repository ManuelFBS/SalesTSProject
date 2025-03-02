import express from "express";
import {
  createNewEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from "../../controllers/EmployeesControllers/employees.controller.js";
import { authorizeRoles } from "../../middlewares/authMiddlewares/authMiddleware.js";
import { validateEmployee } from "../../middlewares/employees/validateEmployee.js";

const employeeRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

employeeRouter.post(
  "/employee/new",
  asyncHandler(authorizeRoles(["Owner", "Admin"])),
  validateEmployee,
  asyncHandler(createNewEmployee)
);

employeeRouter.get(
  "/",
  asyncHandler(authorizeRoles(["Owner", "Admin"])),
  getAllEmployees
);

employeeRouter.get(
  "/employee/:dni",
  asyncHandler(authorizeRoles(["Owner", "Admin"])),
  getEmployee
);

employeeRouter.patch(
  "/employee/edit/:dni",
  asyncHandler(authorizeRoles(["Owner", "Admin"])),
  updateEmployee
);

export { employeeRouter };
