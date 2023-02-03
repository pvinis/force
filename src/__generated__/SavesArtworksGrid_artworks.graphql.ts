/**
 * @generated SignedSource<<de08d9b104b67e2aeb2bc2fd981123e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworksGrid_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly id: string;
    } | null;
  } | null> | null;
  readonly pageCursors: {
    readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
  };
  readonly pageInfo: {
    readonly endCursor: string | null;
    readonly hasNextPage: boolean;
  };
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworkGrid_artworks">;
  readonly " $fragmentType": "SavesArtworksGrid_artworks";
};
export type SavesArtworksGrid_artworks$key = {
  readonly " $data"?: SavesArtworksGrid_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworksGrid_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PageInfo",
      "kind": "LinkedField",
      "name": "pageInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasNextPage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endCursor",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageCursors",
      "kind": "LinkedField",
      "name": "pageCursors",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Pagination_pageCursors"
        }
      ],
      "storageKey": null
    },
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            }
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
  "type": "ArtworkConnection",
  "abstractKey": null
};

(node as any).hash = "b4aa4376aa8252bd09bd918d5467a114";

export default node;
