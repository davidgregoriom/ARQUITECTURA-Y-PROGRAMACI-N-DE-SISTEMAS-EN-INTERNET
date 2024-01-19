import mongoose from "npm:mongoose@8.0.1";
import {Event } from "../types.ts"

const Schema = mongoose.Schema
const eventSchema = new Schema({
    title:{ type:String,required:true},
    description:{ type:String,required:true},
    date:{ type:Date,required:true},
    startHour:{ type:Number,required:true},
    endHour:{ type:Number,required:true}
})

export type EventModelType = mongoose.Document & Omit<Event,"id">

export const  EventModel =mongoose.model<EventModelType>("Event",eventSchema)
