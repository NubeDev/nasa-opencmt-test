/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2016, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define([
    "./src/IdentityAggregator",
    "./src/IdentityProvider",
    "./src/IdentityCreationDecorator",
    "./src/IdentityIndicator",
    'legacyRegistry'
], function (
    IdentityAggregator,
    IdentityProvider,
    IdentityCreationDecorator,
    IdentityIndicator,
    legacyRegistry
) {

    legacyRegistry.register("platform/identity", {
        "extensions": {
            "components": [
                {
                    "implementation": IdentityAggregator,
                    "type": "aggregator",
                    "provides": "identityService",
                    "depends": [
                        "$q"
                    ]
                },
                {
                    "implementation": IdentityProvider,
                    "type": "provider",
                    "provides": "identityService",
                    "depends": [
                        "$q"
                    ],
                    "priority": "fallback"
                },
                {
                    "type": "decorator",
                    "provides": "creationService",
                    "implementation": IdentityCreationDecorator,
                    "depends": [
                        "identityService"
                    ]
                }
            ],
            "indicators": [
                {
                    "implementation": IdentityIndicator,
                    "depends": [
                        "identityService"
                    ]
                }
            ],
            "types": [
                {
                    "properties": [
                        {
                            "key": "creator",
                            "name": "Creator"
                        }
                    ]
                }
            ]
        }
    });
});
