import json, sys, re
try:
    with open('chatgpt_raw.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Try finding remix context
    match = re.search(r'window\.__remixContext\s*=\s*(\{.*?\});', html, re.DOTALL)
    if match:
        json_str = match.group(1)
        data = json.loads(json_str)
        # Find linear_conversation deep inside the context
        def find_conversation(obj):
            if isinstance(obj, dict):
                if 'linear_conversation' in obj:
                    return obj['linear_conversation']
                for k, v in obj.items():
                    res = find_conversation(v)
                    if res: return res
            elif isinstance(obj, list):
                for item in obj:
                    res = find_conversation(item)
                    if res: return res
            return None
        
        conv = find_conversation(data)
        if conv:
            for msg in conv:
                role = msg.get('message', {}).get('author', {}).get('role', 'unknown')
                parts = msg.get('message', {}).get('content', {}).get('parts', [])
                if role in ['user', 'assistant'] and parts:
                    print(f'{role.upper()}:\n{parts[0]}\n---')
            sys.exit(0)
        else:
            print("Found remix context but no linear_conversation")
    else:
        print("No __remixContext found")

    # If that fails, let's just search for typical message structures using regex
    # ChatGPT messages often have "author":{"role":"user"} or "assistant"
    # and "content":{"parts":["..."]}
    print("Trying regex extraction for parts...")
    parts_matches = re.findall(r'\"role\":\"(user|assistant)\".*?\"parts\":\[\"(.*?)\"\]', html)
    if parts_matches:
        for role, text in parts_matches:
            # text could be escaped json string, try to decode
            try:
                decoded_text = text.encode().decode('unicode_escape')
            except:
                decoded_text = text
            print(f'{role.upper()}:\n{decoded_text}\n---')
        sys.exit(0)
    else:
        print("Regex found nothing either.")

except Exception as e:
    print('Error:', str(e))
