/**
 * @generated SignedSource<<623d6760a2b7e42478c6c1aef8cfd667>>
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
    readonly default: boolean;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"SavesArtworks_collection">;
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "default",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SavesArtworks_collection"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "313562e5060905ba0686ea5d35af9d54";

export default node;
