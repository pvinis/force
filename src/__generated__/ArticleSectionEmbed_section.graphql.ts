/**
 * @generated SignedSource<<dee3bffed27f46bf068b9da2c215c4e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArticleSectionEmbedLayout = "COLUMN_WIDTH" | "FILLWIDTH" | "OVERFLOW" | "OVERFLOW_FILLWIDTH" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionEmbed_section$data = {
  readonly url: string | null;
  readonly height: number | null;
  readonly mobileHeight: number | null;
  readonly _layout: ArticleSectionEmbedLayout | null;
  readonly " $fragmentType": "ArticleSectionEmbed_section";
};
export type ArticleSectionEmbed_section$key = {
  readonly " $data"?: ArticleSectionEmbed_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionEmbed_section">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionEmbed_section",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "height",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mobileHeight",
      "storageKey": null
    },
    {
      "alias": "_layout",
      "args": null,
      "kind": "ScalarField",
      "name": "layout",
      "storageKey": null
    }
  ],
  "type": "ArticleSectionEmbed",
  "abstractKey": null
};

(node as any).hash = "f4b6c79819bbb68651aea4f9094d8764";

export default node;
