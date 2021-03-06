/**
 * Created by jianzhiqiang on 2017/6/2.
 */
"use strict";

var models = require('../models');
var logger = require('../logger');
var _ = require('lodash');

var ChatHistory = module.exports;

ChatHistory.findById = function (uuid, callback) {

    models.ChatHistory.findById(uuid).then(function (data) {

        callback(null, data);

    }).catch(function (err) {
        logger.error(err);

        callback(err);
    });
};

ChatHistory.findOne = function (condition, callback) {

    models.ChatHistory.findOne({where: condition}).then(function (data) {

        callback(null, data);

    }).catch(function (err) {
        logger.error(err);

        callback(err);
    });
};

ChatHistory.createOrUpdate = function (cid, csid, fn) {
    var chatHistory = {};
    chatHistory.cid = cid;
    chatHistory.csid = csid;

    models.ChatHistory.findOne({ where: {cid: cid, csid: csid} }).then(function (data) {
        if(data) {
            models.ChatHistory.update({'updatedAt': new Date()}, {fields: ['updatedAt'], 'where': {'uuid': data.uuid}})
                .then(function () {
                    fn(true);
                })
                .catch(function (err) {
                    logger.error(err);
                    fn(false);
                });
        } else {
            models.ChatHistory.create(chatHistory).then(function (data) {
                fn(true);
            }).catch(function (err) {
                logger.error(err);
                fn(false);
            });
        }
    }).catch(function (err) {
        logger.error(err);
        fn(false);
    });
};



ChatHistory.updateMarked = function (cid, csid, marked, fn) {

    models.ChatHistory.update({'marked': marked}, {fields: ['marked'], 'where': {'cid': cid, 'csid': csid}})
        .then(function () {
            fn(true);
        })
        .catch(function (err) {
            logger.error(err);
            fn(false);
        });
};

ChatHistory.insert = function (chatHistory, callback) {
    models.ChatHistory.create(chatHistory).then(function (data) {
        callback(null, data);
    }).catch(function (err) {
        logger.error(err);
        callback(err);
    });
};

ChatHistory.delete = function (condition, callback) {

    models.ChatHistory.destroy({where: condition}).then(function (data) {

        callback(null, data);

    }).catch(function (err) {
        logger.error(err);

        callback(err);
    });
};

ChatHistory.list = function (condition, order, pageSize, pageNum, callback) {
    order = order || [['createdAt', 'DESC']];
    pageSize = pageSize || 10;
    pageNum = pageNum || 0;

    models.ChatHistory.findAll({
        where: condition,
        order: order,
        offset: pageSize * pageNum,
        limit: pageSize
    }).then(function (data) {

        callback(null, data);

    }).catch(function (err) {
        logger.error(err);

        callback(err);
    });
};

ChatHistory.listAndCount = function (condition, order, pageSize, pageNum, callback) {
    order = order || [['createdAt', 'DESC']];
    pageSize = pageSize || 10;
    pageNum = pageNum || 0;

    models.ChatHistory.findAndCountAll({
        where: condition,
        order: order,
        offset: pageSize * pageNum,
        limit: pageSize
    }).then(function (data) {

        callback(null, data);

    }).catch(function (err) {
        logger.error(err);

        callback(err);
    });
};

ChatHistory.Count = function (options, callback) {

    options = options || {};

    models.ChatHistory.count(options).then(function (data) {

        return callback(null, data);

    }).catch(function (err) {
        logger.error(err);

        return callback(err);
    });
};