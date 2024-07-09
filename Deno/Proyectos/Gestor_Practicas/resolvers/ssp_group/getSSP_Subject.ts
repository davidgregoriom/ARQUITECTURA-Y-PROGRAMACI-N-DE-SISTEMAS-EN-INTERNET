// @deno-types="npm:@types/express@4.17.15"
import { } from "npm:express@4.18.2";
import {  SSP_Group  } from "../../models.ts";
import {  SSP_GroupType,DegreeType } from "../../types.ts";
import { getDegree_SSP } from "../degree/getDegree_SSP.ts";

type Response = {
    id: number;
    id_degree: number;
    uxxi_activity_group: string;
    morning_afternoon_group: string;
    name_grade: string;
    ssp_group_grade: string;
}

export const getSSP_Subject = async (id_subject:number) => {
    try {
        if(!id_subject){
            return  null;
        }
        const SSP_GroupDB = await SSP_Group.where({ id_subject:id_subject}).get();
        if (SSP_GroupDB!==undefined || Object.keys(SSP_GroupDB).length>0) {
            const result:Response = SSP_GroupDB.map((ssp_group:SSP_GroupType) => {
                const Degree:DegreeType = getDegree_SSP(ssp_group.id_degree);
                return {
                    id: ssp_group.id,
                    id_degree: ssp_group.id_degree,
                    uxxi_activity_group: ssp_group.uxxi_activity_group,
                    morning_afternoon_group: ssp_group.morning_afternoon_group,
                    name_grade: Degree.name,
                    ssp_group_grade: Degree.ssp_group,
                };
            });
            return result;
        } else {
            return null;
        }
        // TODO: Send verification email using smtp module
    } catch (error) {

    }
}
