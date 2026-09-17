type UnsplashPhoto = {
  id: string;
  urls: {
    regular: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
    download_location: string;
  };
};

export async function searchUnsplash(query: string) {
  const key = process.env.UNSPLASH_ACCESS_KEY;

  if (!key) {
    throw new Error("UNSPLASH_ACCESS_KEY is missing");
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=8&orientation=landscape`,
    {
      headers: {
        Authorization: `Client-ID ${key}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status}`);
  }

  const data = (await response.json()) as {
    results: UnsplashPhoto[];
  };
  console.log("UNSPLASH QUERY:", query);
  console.log("UNSPLASH STATUS:", response.status);
  console.log("UNSPLASH RESULTS:", data.results.length);
  console.log("UNSPLASH FIRST PHOTO:", data.results[0]?.urls?.regular);
  

  return data.results;
}