// Phase 1 shim. Keeps the urlFor() call sites in pages and App.tsx compiling
// without pulling in @sanity/client or @sanity/image-url. Phase 2 deletes this
// file when FireCMS ships and images move to Firebase Storage.

interface ImageUrlStub {
  width(n: number): ImageUrlStub;
  height(n: number): ImageUrlStub;
  auto(mode: string): ImageUrlStub;
  format(fmt: string): ImageUrlStub;
  url(): string;
}

export function urlFor(source: unknown): ImageUrlStub {
  const stub: ImageUrlStub = {
    width: () => stub,
    height: () => stub,
    auto: () => stub,
    format: () => stub,
    url: () => (typeof source === 'string' ? source : ''),
  };
  return stub;
}
