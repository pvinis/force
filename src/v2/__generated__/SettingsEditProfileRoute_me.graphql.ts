/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileAboutYou_me" | "SettingsEditProfileArtistsYouCollect_me" | "SettingsEditProfileYourGalleryIntro_me">;
    readonly " $refType": "SettingsEditProfileRoute_me";
};
export type SettingsEditProfileRoute_me$data = SettingsEditProfileRoute_me;
export type SettingsEditProfileRoute_me$key = {
    readonly " $data"?: SettingsEditProfileRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileAboutYou_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileArtistsYouCollect_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileYourGalleryIntro_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = 'd100364f21da4a8e4b13c80efc42142a';
export default node;
