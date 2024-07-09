// @deno-types="npm:@types/express@4.17.15"
import { } from "npm:express@4.18.2";
import {  Degree  } from "../../models.ts";
import {  DegreeType } from "../../types.ts";

export const getDegree_SSP = async (id_degree:number) => {
    try {
        if(!id_degree){
            return  null;
        }
        const DegreeDB = await Degree.find(id_degree);
        if (DegreeDB!==undefined || Object.keys(DegreeDB).length>0) {
            const result:DegreeType = DegreeDB.map((Degree:DegreeType) => {
                return Degree;

            });
            return result;
        } else {
            return null;
        }
        // TODO: Send verification email using smtp module
    } catch (error) {

    }
}
