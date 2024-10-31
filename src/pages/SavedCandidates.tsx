import {useEffect, useState}  from 'react';

import {Candidate} from '../interfaces/Candidate.interface';




const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates')|| '[]');
    setSavedCandidates(candidates);
  }, []);

  if (savedCandidates.length===0){
    return<p> No candidates yet</p>
  }
  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate)=> (
              <tr key={candidate.login}>
                    <td>
                      <img src={candidate.avatar_url} width={50}/>
                    </td>
                    <td>{candidate.name||'N/A'}</td>
                    <td>
                      <a href={candidate.html_url} target="_blank" rel="non">
                        Github Profile
                      </a>
                    </td>
              </tr>
            ))}
          </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
