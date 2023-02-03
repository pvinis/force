/**
 * @generated SignedSource<<a3df8c20b848cb03b26c085daf9caf1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectorProfileRoutes_Saves2ByIdQuery$variables = {
  id: string;
};
export type collectorProfileRoutes_Saves2ByIdQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSaves2ByIdRoute_me">;
  } | null;
};
export type collectorProfileRoutes_Saves2ByIdQuery = {
  response: collectorProfileRoutes_Saves2ByIdQuery$data;
  variables: collectorProfileRoutes_Saves2ByIdQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "collectorProfileRoutes_Saves2ByIdQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": (v1/*: any*/),
            "kind": "FragmentSpread",
            "name": "CollectorProfileSaves2ByIdRoute_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "collectorProfileRoutes_Saves2ByIdQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Collection",
            "kind": "LinkedField",
            "name": "collection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "349a59753b49f0c5045fc49057689096",
    "id": null,
    "metadata": {},
    "name": "collectorProfileRoutes_Saves2ByIdQuery",
    "operationKind": "query",
    "text": "query collectorProfileRoutes_Saves2ByIdQuery(\n  $id: String!\n) {\n  me {\n    ...CollectorProfileSaves2ByIdRoute_me_1Bmzm5\n    id\n  }\n}\n\nfragment CollectorProfileSaves2ByIdRoute_me_1Bmzm5 on Me {\n  collection(id: $id) {\n    internalID\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "00f87d51419f7476ea9ffdeabc077617";

export default node;
