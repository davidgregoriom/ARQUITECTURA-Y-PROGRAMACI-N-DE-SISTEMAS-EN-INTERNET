import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { ObjectId } from "mongo";
import { RouterContext } from "oak/router.ts";
import { slotsCollection } from "../db/database.ts";
import { SlotSchema } from "../db/schemas.ts";

type GetAvailabeSlotsContext = RouterContext<
  "/availableSlots",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const availableSlots = async (context: GetAvailabeSlotsContext) => {
  try {
    const params = getQuery(context, { mergeParams: true });
    if (!params.year || !params.month) {
      context.response.status = 403;
      return;
    }
    const { year, month, day ,id_doctor} = params;
    if (!day) {
      if(!id_doctor){
        const slots = await slotsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          available: true,
        })
        .toArray();
        context.response.body = slots.map((slot) => {
          const { _id, ...rest } = slot;
          return rest;
        });
      }else{
        const slots = await slotsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          available: true,
          id_doctor: id_doctor,
        })
        .toArray();
        context.response.body = slots.map((slot) => {
          const { _id, ...rest } = slot;
          return rest;
        });
      }
      
    } else {
      if(!id_doctor){
        const slots = await slotsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          available: true,
        })
        .toArray();
        context.response.body = slots.map((slot) => {
          const { _id, ...rest } = slot;
          return rest;
        });
      }else{
        const slots = await slotsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          available: true,
          id_doctor: id_doctor,
        })
        .toArray();
        context.response.body = slots.map((slot) => {
          const { _id, ...rest } = slot;
          return rest;
        });
      }
    }
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};

type GetDoctorAppointmentsContext = RouterContext<
  "/doctorAppointments/:id_doctor",
  {
    id_doctor: string;
  }
  &Record<string | number, string | undefined>,
  Record<string, any>
>;

export const doctorAppointments = async (context: GetDoctorAppointmentsContext) => {
  try {
    const day =new Date().getDate();
    const month =new Date().getMonth();
    const year =new Date().getFullYear();
    const id_doctor= context.params?.id_doctor;
    if(!id_doctor) {
      context.response.status=404;
      context.response.body={message:"No existe este id_doctor"};
    }
    const doctorConsults=await slotsCollection.find({id_doctor,day:{$gte:day},month:{$gte:month},year:{$gte:year},available:false}).toArray();
    context.response.body = doctorConsults.map((slot) => {
      const { _id, ...rest } = slot;
      return rest;
    }); 
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
}


type GetPatientAppointmentsContext = RouterContext<
  "/patientAppointments/:dni",
  {
    dni: string;
  }
  &Record<string | number, string | undefined>,
  Record<string, any>
>;



export const patientAppointments = async (context: GetPatientAppointmentsContext) => {
  try {
    const day =new Date().getDate();
    const month =new Date().getMonth();
    const year =new Date().getFullYear();
    const dni= context.params?.dni;
    if(!dni) {
      context.response.status=404;
      context.response.body={message:"No esta este dni"};
    }
    const patientConsults=await slotsCollection.find({dni,day:{$gte:day},month:{$gte:month},year:{$gte:year}}).toArray();
    context.response.body = patientConsults.map((slot) => {
      const { _id, ...rest } = slot;
      return rest;
    });
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
}