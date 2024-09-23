function hideSponsoredPosts() {
    // Array of sponsored text in different languages
    const sponsoredTexts = [
      'Sponsored', // English
      'Gesponsord', // Dutch
      'Sponsorisé', // French
      'Sponsorizzato', // Italian
      'Patrocinado', // Spanish
      'Sponsrad', // Swedish
      'Gesponsert', // German
      'スポンサー', // Japanese
      '広告', // Japanese (alternative)
      '赞助商链接', // Chinese (Simplified)
      'Sponsorowane', // Polish
      'Реклама', // Russian
      'Sponsorlu', // Turkish
      'Patrocinado', // Portuguese
      'Sponsoroitu', // Finnish
      'Sponsoreret', // Danish
      'Sponset', // Norwegian
      'Sponsoroitu', // Finnish
      'Χορηγούμενη', // Greek
      'ממומן', // Hebrew
      'Sponsorováno', // Czech
      'Sponzorováno', // Slovak
      'Sponsorizat', // Romanian
      'Szponzorált', // Hungarian
      'Sponsorirano', // Croatian
      'Sponsoreret', // Danish
      'Sponsorowany', // Polish
      'Sponzorovano', // Serbian
    ];
  
    // Create a regex pattern from the array of sponsored texts
    const sponsoredRegex = new RegExp(sponsoredTexts.join('|'), 'i');
  
    // Select elements containing any of the sponsored texts
    const sponsoredElements = document.evaluate(
      `//span[${sponsoredTexts.map(text => `contains(text(), '${text}')`).join(' or ')}]`,
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
  
    for (let i = 0; i < sponsoredElements.snapshotLength; i++) {
      let element = sponsoredElements.snapshotItem(i);
      let parentCard = element.closest('.s-result-item');
      if (parentCard) {
        parentCard.style.display = 'none';
      }
    }
  
    // Also hide elements with the original selector
    const sponsoredPosts = document.querySelectorAll('[data-component-type="sp-sponsored-result"]');
    sponsoredPosts.forEach(post => {
      // Check if the post contains any of the sponsored texts
      if (!sponsoredRegex.test(post.textContent)) {
        post.style.display = 'none';
      }
    });
  }
  
  // Run the function when the page loads
  hideSponsoredPosts();
  
  // Use a MutationObserver to handle dynamically loaded content
  const observer = new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.addedNodes.length > 0)) {
      hideSponsoredPosts();
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Rerun the function periodically to catch any missed items
  setInterval(hideSponsoredPosts, 2000);