import { GraphQLError } from "graphql";
import { PetModel, PetModelType } from "../db/pet.ts";
import { PersonModel, PersonModelType } from "../db/person.ts";
import mongoose from "mongoose";
import { EventModel, EventModelType } from "../db/event.ts";

export const Mutation = {
  addPet: async (
    _: unknown,
    args: { name: string; breed: string; owner: string }
  ): Promise<PetModelType> => {
    const pet = {
      name: args.name,
      breed: args.breed,
      owner: new mongoose.Types.ObjectId(args.owner),
    };
    const newPet = await PetModel.create(pet);
    return newPet;
  },
  deletePet: async (
    _: unknown,
    args: { id: string }
  ): Promise<PetModelType> => {
    const pet = await PetModel.findByIdAndDelete(args.id);
    if (!pet) {
      throw new GraphQLError(`No pet found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return pet;
  },
  updatePet: async (
    _: unknown,
    args: { id: string; name: string; breed: string; owner: string }
  ): Promise<PetModelType> => {
    const pet = await PetModel.findByIdAndUpdate(
      args.id,
      { name: args.name, breed: args.breed, owner: args.owner },
      { new: true, runValidators: true }
    );
    if (!pet) {
      throw new GraphQLError(`No pet found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return pet;
  },

  addPerson: async (
    _: unknown,
    args: { name: string; age: number }
  ): Promise<PersonModelType> => {
    const person = {
      name: args.name,
      age: args.age,
    };
    const newPerson = await PersonModel.create(person);
    return newPerson;
  },

  deletePerson: async (
    _: unknown,
    args: { id: string }
  ): Promise<PersonModelType> => {
    const person = await PersonModel.findByIdAndDelete(args.id);
    if (!person) {
      throw new GraphQLError(`No person found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return person;
  },

  updatePerson: async (
    _: unknown,
    args: { id: string; name: string; age: number }
  ): Promise<PersonModelType> => {
    const person = await PersonModel.findByIdAndUpdate(
      args.id,
      { name: args.name, age: args.age },
      { new: true, runValidators: true }
    );
    if (!person) {
      throw new GraphQLError(`No person found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return person;
  },
  addEvent: async(
    _:unknown,
    args: {title:string,description:string,date:Date,startHour:number,endHour:number  }
  ):Promise<EventModelType>=>{
    const event={
      title:args.title,
      description:args.description,
      date:args.date,
      startHour:args.startHour,
      endHour:args.endHour
    }
    const exits = await EventModel.findOne(event);
    if(exits){
      throw new GraphQLError(`Event already exists`, {
        extensions: { code: "ALREADY_EXISTS" },
      });
    }
    const eventsarround = await EventModel.findOne({
      date: new Date(event.date),
      $or:[
        { startHour: { $gte: event.startHour, $lte: event.endHour } },
        { endHour: { $gte: event.startHour, $lte: event.endHour } },
      ],
    })
    if(eventsarround){
      throw new GraphQLError(`Events arround already exists`, {
        extensions: { code: "ALREADY_EXISTS" },
      });
    }
    const newEvent= await EventModel.create(event);
    return newEvent;
  },
  deleteEvent: async(
    _:unknown,
    args: {id:string}
  ):Promise<EventModelType>=>{
    const event = await EventModel.findByIdAndDelete(args.id);
    if(!event){
      throw new GraphQLError(`No person found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return event;
  },
  updateEvent: async(
    _:unknown,
    args:{id:string,title:string,description:string,date:Date,startHour:number,endHour:number}
  ):Promise <EventModelType>=>{
    const event={
      title:args.title,
      description:args.description,
      date:args.date,
      startHour:args.startHour,
      endHour:args.endHour
    }
    const eventsarround = await EventModel.findOne({
      date: new Date(event.date),
      $or:[
        { startHour: { $gte: event.startHour, $lte: event.endHour } },
        { endHour: { $gte: event.startHour, $lte: event.endHour } },
      ],
    })
    if(eventsarround){
      throw new GraphQLError(`Events arround already exists`, {
        extensions: { code: "ALREADY_EXISTS" },
      });
    }
    const updatevent = await EventModel.findByIdAndUpdate(
      args.id,
      {event},
      {new:true,runValidators:true}
    );
    if(!updatevent){
      throw new GraphQLError(`No event found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return updatevent;
  }

};
