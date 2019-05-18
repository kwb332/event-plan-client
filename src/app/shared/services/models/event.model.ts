export interface Event
{
id: number
_id? : string,
title: string,
poster: string,
type: string,
description: string,
street: string,
state: string,
primaryColor: string,
secondaryColor: string,
startDate: Date,
endDate: Date

}

export interface EventUpdateInput
{
id: number
_id? : string,
title: string,
poster: string,
type: string,
description: string,
street: string,
state: string,
primaryColor: string,
secondaryColor: string,
startDate: Date,
endDate: Date

}

export interface EventInput
{
title: string,
poster: string,
type: string,
description: string,
street: string,
state: string,
primaryColor: string,
secondaryColor: string,
startDate: Date,
endDate: Date

}

