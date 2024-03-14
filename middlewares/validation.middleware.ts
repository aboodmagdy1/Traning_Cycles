import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware =
  (validationDto: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check for validation errors
      const inputs = plainToClass(validationDto, req.body);
      const inputErrors = await validate(inputs, {
        validationError: { target: false },
      });

      if (inputErrors.length > 0) {
        const errorMessages = inputErrors
          .map((error) => {
            if (error.constraints) {
              return Object.values(error.constraints).join(", ");
            } else {
              return "validation error";
            }
          })
          .join(", ");
        return res
          .status(400)
          .json({ message: "Validation error", errors: errorMessages });
      }
    } catch (error) {
      // Handle unexpected errors
      return res.status(500).json({ message: "Internal server error" });
    }

    // If no validation errors, proceed to the next middleware
    next();
  };
