/**
 * Simple translation helper using Google Translate's free API endpoint.
 * This is an unofficial endpoint and should be used with caution/caching.
 */
export async function translateText(text, targetLang = 'id', sourceLang = 'en') {
  if (!text) return '';
  if (targetLang === sourceLang) return text;

  // Simple caching in session storage
  const cacheKey = `trans_${sourceLang}_${targetLang}_${text.substring(0, 50)}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Translation request failed');
    
    const data = await response.json();
    // data[0] is an array of sentence translations
    const translatedText = data?.[0]?.map(s => s[0]).join('') || text;
    
    sessionStorage.setItem(cacheKey, translatedText);
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
}
