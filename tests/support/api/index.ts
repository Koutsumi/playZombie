import {  APIRequestContext, expect } from "@playwright/test"

export class Api{
    request: APIRequestContext
    token: string
    constructor(request){
        this.request = request
        this.token 
    }

    async setToken(){
        const response = await this.request.post('http://localhost:3333/sessions', {
            data:{
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        await expect(response.ok()).toBeTruthy();

        const body = JSON.parse(await response.text());
        this.token = body.token;
        console.log(this.token);
    }

    async getCompanyByName(companyName){
        const response = await this.request.get(`http://localhost:3333/companies?name=${companyName}`, {
            headers:{
                Authorization: `Bearer ${this.token}`
            }
        })

        await expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text());
        const company_id = body.data[0].id;
        return company_id;
    }

    async postMovie(data){
        await this.setToken();
        const company_id = await this.getCompanyByName(data.company)

        const response = await this.request.post('http://localhost:3333/movies',{
            headers: {
                Authorization: `Bearer ${this.token}`,
                ContentType: 'multipart/form-data',
                Accept: 'applicarion/json, text/plain, */*'
            },
            multipart: {
                title: `${data.title}`,
                overview: `${data.overview}`,
                company_id: `${company_id}`,
                release_year: `${data.release_year}`,
                featured: `${data.featured}`
            }
        })
        await expect(response.ok()).toBeTruthy();
    }
}