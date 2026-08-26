import type { Page } from "astro";

function normalizeBasePath(basePath: string): string {
  if (!basePath.startsWith("/")) basePath = `/${basePath}`;
  if (!basePath.endsWith("/")) basePath = `${basePath}/`;
  return basePath;
}

export function parsePageNumber(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return 1;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function buildRuntimePage<T>(
  items: T[],
  currentPage: number,
  pageSize: number,
  basePath: string
): Page<T> {
  const normalizedBasePath = normalizeBasePath(basePath);
  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const pageNumber = Math.min(Math.max(currentPage, 1), lastPage);
  const start = total === 0 ? 0 : (pageNumber - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const data = items.slice(start, end);
  const current = pageNumber === 1 ? normalizedBasePath : `${normalizedBasePath}${pageNumber}/`;
  const prev =
    pageNumber > 1
      ? pageNumber === 2
        ? normalizedBasePath
        : `${normalizedBasePath}${pageNumber - 1}/`
      : null;
  const next =
    pageNumber < lastPage ? `${normalizedBasePath}${pageNumber + 1}/` : null;

  return {
    data,
    currentPage: pageNumber,
    lastPage,
    size: pageSize,
    total,
    start,
    end,
    url: {
      current,
      prev,
      next,
    },
  } as Page<T>;
}
