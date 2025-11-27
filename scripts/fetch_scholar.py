import json
import os
from scholarly import scholarly

def fetch_publications(author_id):
    print(f"Fetching publications for author ID: {author_id}")
    author = scholarly.search_author_id(author_id)
    scholarly.fill(author, sections=['publications'])
    
    publications = []
    for pub in author['publications']:
        # Fill publication details to get complete information including authors
        try:
            scholarly.fill(pub)
        except Exception as e:
            print(f"Warning: Could not fill details for publication: {pub['bib'].get('title', 'Unknown')}")
        
        # Format author names properly
        author_list = pub['bib'].get('author', '')
        if isinstance(author_list, list):
            author_str = ', '.join(author_list)
        else:
            author_str = author_list if author_list else 'Unknown Author'
        
        pub_data = {
            'title': pub['bib'].get('title', 'Untitled'),
            'year': pub['bib'].get('pub_year', 'N/A'),
            'citation_count': pub.get('num_citations', 0),
            'venue': pub['bib'].get('venue') or pub['bib'].get('journal') or pub['bib'].get('citation', ''),
            'author': author_str,
            'url': pub.get('pub_url')
        }
        publications.append(pub_data)
    
    # Sort by year descending
    publications.sort(key=lambda x: x['year'] if x['year'] else '0', reverse=True)
    
    return publications

def main():
    AUTHOR_ID = '2pDm_0UAAAAJ'
    output_file = os.path.join(os.path.dirname(__file__), '../data/publications.json')
    
    # Ensure data directory exists
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    try:
        pubs = fetch_publications(AUTHOR_ID)
        with open(output_file, 'w') as f:
            json.dump(pubs, f, indent=2)
        print(f"Successfully saved {len(pubs)} publications to {output_file}")
    except Exception as e:
        print(f"Error fetching publications: {e}")
        exit(1)

if __name__ == "__main__":
    main()
