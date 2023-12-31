import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const openWeatherApiKey = process.env.API_KEY;
    if (!openWeatherApiKey) {
        return NextResponse.json({ "error": "API Key not found" });
    }
    
    const city = params.city?.toLowerCase();
    if (!city) {
        return NextResponse.json({ "error": "City not found" });
    }
    let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${openWeatherApiKey}`;
    console.log(openWeatherUrl);

    const response_data = await fetch(openWeatherUrl, { 
        method: 'GET',
        next: { revalidate: 1000 },
    })

    const response_data_json = await response_data.json();
    console.log('response data:', response_data_json);

    return Response.json(response_data_json);
};
