import { createContext, SetStateAction } from "react";
import React, { Dispatch } from "react";

const myContext = createContext([] as (Dispatch<SetStateAction<undefined>> | undefined)[]);

export default myContext;