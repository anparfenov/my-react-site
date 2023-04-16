import { HttpClient, HttpNodeEngine } from '@asleeppiano/http-client';

export const GITHUB_API_URL = "https://api.github.com";

export const githubApiClient = new HttpClient({
    baseUrl: GITHUB_API_URL,
    engine: new HttpNodeEngine()
});