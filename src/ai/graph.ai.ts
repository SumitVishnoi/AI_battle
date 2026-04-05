import {StateSchema, StateGraph, type GraphNode} from "@langchain/langgraph"
import z from "zod"

const state = new StateSchema ({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        soultion_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default("")
    })
})


