import { NextRequest, NextResponse } from 'next/server';

const REPO_RAW_BASE =
  'https://raw.githubusercontent.com/otakgemuk/SireIndicators/main/';

export const GET = async (request: NextRequest) => {
  const scriptPath = request.nextUrl.searchParams.get('path');

  if (!scriptPath) {
    return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
  }

  // Only published Pine sources in the dedicated scripts folder are readable.
  if (!/^scripts\/[a-z0-9-]+\.pine$/.test(scriptPath)) {
    return NextResponse.json({ error: 'Invalid script path' }, { status: 400 });
  }

  try {
    const encodedPath = scriptPath.split('/').map(encodeURIComponent).join('/');
    const response = await fetch(`${REPO_RAW_BASE}${encodedPath}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Script not found' }, { status: 404 });
    }

    const content = await response.text();

    return NextResponse.json(
      { content },
      {
        headers: {
          'Cache-Control': 'public, max-age=300',
        },
      }
    );
  } catch (error) {
    console.error('Script fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch script' },
      { status: 500 }
    );
  }
};
