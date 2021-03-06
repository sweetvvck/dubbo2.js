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
import Context from '../context';
import java from 'js-to-java';

describe('context test suite', () => {
  it('test default Value', () => {
    const ctx = Context.create();
    expect(ctx.requestId).toEqual(1);
    expect(ctx.application).toEqual({name: 'dubbo2.js'});
    expect(ctx.isNotScheduled).toEqual(true);
  });

  it('test hessian', () => {
    const ctx = Context.create();
    ctx.methodArgs = [1, 'hello'] as any;
    expect(ctx.isMethodArgsHessianType).toEqual(false);

    ctx.methodArgs = [java.int(1), java.String('hello')] as any;
    expect(ctx.isMethodArgsHessianType).toEqual(true);
  });
});
