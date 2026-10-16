#!/usr/bin/env python3
"""Download permitted-to-inspect public source repositories for offline curriculum review.
Not an authorization to republish their contents. Run on a machine with Internet access.
"""
from __future__ import annotations
import argparse, json, hashlib, pathlib, urllib.request, urllib.error, zipfile, io, time

HERE = pathlib.Path(__file__).resolve().parent

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dest', default='downloaded')
    ap.add_argument('--only', choices=['python','scratch','both','all'], default='all')
    args = ap.parse_args()
    target = HERE / args.dest
    target.mkdir(parents=True, exist_ok=True)
    results=[]
    for entry in json.loads((HERE/'sources.json').read_text(encoding='utf-8')):
        if args.only != 'all' and args.only not in [entry['subject'], 'both'] and entry['subject'] != 'both':
            continue
        owner_repo = entry['repo']; slug=owner_repo.replace('/','__')
        url=f"https://api.github.com/repos/{owner_repo}/zipball/{entry['branch']}"
        out=target/f'{slug}.zip'
        print('Downloading', owner_repo)
        try:
            req=urllib.request.Request(url,headers={'User-Agent':'Tanisten-Learn-curriculum-source-research','Accept':'application/vnd.github+json'})
            with urllib.request.urlopen(req,timeout=90) as r:
                raw=r.read()
            if not zipfile.is_zipfile(io.BytesIO(raw)):
                raise ValueError('Not a valid ZIP response')
            out.write_bytes(raw)
            sha=hashlib.sha256(raw).hexdigest()
            results.append({'repo':owner_repo,'file':str(out.relative_to(HERE)),'sha256':sha,'bytes':len(raw),'license_review':entry['license'],'result':'downloaded'})
            print('  OK',len(raw),'bytes')
        except (urllib.error.URLError, TimeoutError, ValueError, OSError) as e:
            results.append({'repo':owner_repo,'error':str(e),'result':'failed'})
            print('  FAILED',e)
        time.sleep(0.4)
    (target/'download_report.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
    print('\nSaved report:',target/'download_report.json')
    print('Successful:',sum(x['result']=='downloaded' for x in results),'of',len(results))

if __name__=='__main__':main()
