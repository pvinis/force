/**
 * @generated SignedSource<<aff2bf34ec73d1798386c4ed213dcc48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSaves2ByIdRoute_me$data = {
  readonly collection: {
    readonly internalID: string;
  } | null;
  readonly " $fragmentType": "CollectorProfileSaves2ByIdRoute_me";
};
export type CollectorProfileSaves2ByIdRoute_me$key = {
  readonly " $data"?: CollectorProfileSaves2ByIdRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSaves2ByIdRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "id"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileSaves2ByIdRoute_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
        }
      ],
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "3197bff3c51a981f5ad70f4b3e5fecf5";

export default node;
