/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type getConvectionGeminiKeyQueryVariables = {};
export type getConvectionGeminiKeyQueryResponse = {
    readonly system: {
        readonly services: {
            readonly convection: {
                readonly geminiTemplateKey: string;
            };
        } | null;
    } | null;
};
export type getConvectionGeminiKeyQuery = {
    readonly response: getConvectionGeminiKeyQueryResponse;
    readonly variables: getConvectionGeminiKeyQueryVariables;
};



/*
query getConvectionGeminiKeyQuery {
  system {
    services {
      convection {
        geminiTemplateKey
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "System",
    "kind": "LinkedField",
    "name": "system",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Services",
        "kind": "LinkedField",
        "name": "services",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConvectionService",
            "kind": "LinkedField",
            "name": "convection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "geminiTemplateKey",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "getConvectionGeminiKeyQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "getConvectionGeminiKeyQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "getConvectionGeminiKeyQuery",
    "operationKind": "query",
    "text": "query getConvectionGeminiKeyQuery {\n  system {\n    services {\n      convection {\n        geminiTemplateKey\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a7ffae2e10d304400de8792a31ce20ff';
export default node;
