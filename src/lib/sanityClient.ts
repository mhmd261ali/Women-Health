import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "w8a3f9tu",
  dataset: "data",
  token:
    "sksKCBparJDsBol55kowjEZVbBWBCY1b0gCfPuohHPD8c34r3Z42LsKy2yPClvVghHiyBC2l0B9i7yqH9DX9mxImg4DdMmlcINpEslevmH435WE1CKG94eYgvXsykr5FMunKcPFVlSb71Xn7oRaJoc6uLklZXL59358euVZjYWtD5hUujswi",
  useCdn: true,
});
