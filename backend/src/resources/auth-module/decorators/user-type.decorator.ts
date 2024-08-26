import { SetMetadata } from "@nestjs/common";
import { EUserTypes } from "src/shared/@enum/user-type.enum";

export const UserTypes = (...userTypes : EUserTypes[]) => SetMetadata("userTypes", userTypes);