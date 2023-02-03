/**
 * @generated SignedSource<<9f6a7412cb90f43fc7485914bff33666>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesPreviewArtworks_collection$data = {
  readonly artworks: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
      } | null;
    } | null> | null;
    readonly " $fragmentSpreads": FragmentRefs<"SavesArtworkGrid_artworks">;
  } | null;
  readonly default: boolean;
  readonly internalID: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_collection" | "SavesEmptyState_collection">;
  readonly " $fragmentType": "SavesPreviewArtworks_collection";
};
export type SavesPreviewArtworks_collection$key = {
  readonly " $data"?: SavesPreviewArtworks_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesPreviewArtworks_collection">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesPreviewArtworks_collection",
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
    (v0/*: any*/),
    {
      "alias": "artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SavesArtworkGrid_artworks"
        }
      ],
      "storageKey": "artworksConnection(first:10)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavesArtworksGrid_collection"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavesEmptyState_collection"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};
})();

(node as any).hash = "f937497b23978d40e244d0f0742f4dc8";

export default node;
