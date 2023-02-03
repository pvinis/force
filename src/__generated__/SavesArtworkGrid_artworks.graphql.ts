/**
 * @generated SignedSource<<a401ce09488cf942db3d3da412eb916d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworkGrid_artworks$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  readonly " $fragmentType": "SavesArtworkGrid_artworks";
};
export type SavesArtworkGrid_artworks$key = {
  readonly " $data"?: SavesArtworkGrid_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworkGrid_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworkGrid_artworks",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkGrid_artworks"
    }
  ],
  "type": "ArtworkConnection",
  "abstractKey": null
};

(node as any).hash = "e7517e21b619ea68c5ea962b9cbd2463";

export default node;
