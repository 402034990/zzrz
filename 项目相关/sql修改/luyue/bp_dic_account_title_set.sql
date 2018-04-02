/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50611
Source Host           : 127.0.0.1:3306
Source Database       : hycd

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2016-06-12 14:52:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bp_dic_account_title_set
-- ----------------------------
DROP TABLE IF EXISTS `bp_dic_account_title_set`;
CREATE TABLE `bp_dic_account_title_set` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `listId` bigint(20)  DEFAULT NULL COMMENT '配置表ID',
  `keyName` varchar(20) DEFAULT NULL COMMENT 'keyName',
  `keyId` varchar(20) DEFAULT NULL COMMENT 'keyId',
  `subTitle` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '二级科目名称',
  `title` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '一级科目名称',
  `subKey` varchar(100) DEFAULT NULL COMMENT 'subKey',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;