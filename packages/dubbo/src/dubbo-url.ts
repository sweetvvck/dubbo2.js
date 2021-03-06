/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import debug from 'debug';
import qs from 'querystring';
import url, {Url} from 'url';
import {IQueryObj} from './types';

const log = debug('dubbo:dubbo-url');

/**
 *
 * 解析dubbo的url
 *
 * @param dubboUrl dubbo的url
 *
 * 例如：
 * dubbo://192.168.2.1:38080/com.ofpay.demo.api.UserProvider?anyhost=true
 * &application=demo-provider&default.timeout=10000&dubbo=2.4.10
 * &environment=product&interface=com.ofpay.demo.api.UserProvider
 * &methods=getUser,queryAll,queryUser,isLimit&owner=wenwu&pid=61578&side=provider&timestamp=1428904600188
 */
export default class DubboUrl {
  private constructor(providerUrl: string) {
    log('DubboUrl from -> %s', providerUrl);
    this._url = url.parse(providerUrl);
    this._query = qs.parse(providerUrl) as any;
  }

  private readonly _url: Url;
  private readonly _query: IQueryObj;

  static from(providerUrl: string) {
    return new DubboUrl(providerUrl);
  }

  get host() {
    return this._url.hostname;
  }

  get port() {
    return Number(this._url.port);
  }

  get path() {
    return this._url.pathname.substring(1);
  }

  get dubboVersion() {
    return this._query.dubbo || '';
  }

  get version() {
    return this._query.version || '';
  }

  get group() {
    return this._query.group || '';
  }

  toString() {
    return JSON.stringify({
      host: this.host,
      port: this.port,
      path: this.path,
      dubboVersion: this.dubboVersion,
      version: this.version,
      group: this.group,
    });
  }
}
