import { createContext, SetStateAction } from "react";
import React, { Dispatch } from "react";
import Opiniao from "../types/Opiniao";

type Tipo = [Opiniao[] | undefined, Dispatch<SetStateAction<Opiniao[] | undefined>>]

const myContext = createContext<Tipo>();

export default myContext;