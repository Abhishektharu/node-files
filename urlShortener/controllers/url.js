const shortid = require( 'shortid');

const URL = require('../model/url');
const { json } = require('express');


//function to generate short url
async function generateShortUrl(req, res){
    const shortId = shortid();
    const body = req.body;
    //validate if empty parameters 
    if(!body.url) return res.status(400 ).json({error: 'URL is required '});
    await URL.create({
        shortId: shortId,
        redirecedURL: body.url,
        visitedHistory: [],
    });


    return res.json({id: shortId});
}

async function generateAnalytics(req, res){
    const shortId = req.params.shortId;

    //find the user analytics by id 
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks : result.visitedHistory.length,
        _id : result.visitedHistory,
    })
}

module.exports = { 
    generateShortUrl,
    generateAnalytics,
}