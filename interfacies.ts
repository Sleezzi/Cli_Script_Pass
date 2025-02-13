import { Request, Response } from "express";
import { App } from "electron";

export interface Page {
	path: string,
	method?: "GET" | "PUT" | "POST" | "DELETE",
	execute: (request: Request, response: Response, app: App) => void
}