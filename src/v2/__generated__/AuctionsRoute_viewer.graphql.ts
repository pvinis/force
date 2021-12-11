/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import {  } from "relay-runtime";
export type AuctionsRoute_viewer = {
    readonly salesConnection: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug: string;
                readonly name: string | null;
                readonly href: string | null;
                readonly liveStartAt: string | null;
                readonly isLiveOpen: boolean | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "AuctionsRoute_viewer";
};
export type AuctionsRoute_viewer$data = AuctionsRoute_viewer;
export type AuctionsRoute_viewer$key = {
    readonly " $data"?: AuctionsRoute_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AuctionsRoute_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionsRoute_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "auctionState",
          "value": "OPEN"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "live",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "published",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "TIMELY_AT_NAME_ASC"
        }
      ],
      "concreteType": "SaleConnection",
      "kind": "LinkedField",
      "name": "salesConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Sale",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
                  "storageKey": null
                },
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
                  "name": "href",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "liveStartAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isLiveOpen",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "salesConnection(auctionState:\"OPEN\",first:10,live:true,published:true,sort:\"TIMELY_AT_NAME_ASC\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '31630869615293435bad0c0873962ee4';
export default node;
