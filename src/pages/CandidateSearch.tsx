import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

  const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState <Candidate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading]= useState (false);

    useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const data = await searchGithub();
      setCandidates(data);
      setLoading(false);
      }
      fetchCandidates();
    }, []);

    useEffect(()=> {
      if (candidates.length > 0 && currentIndex < candidates.length){

      const fetchCandidateDetails = async () => {
              setLoading (true);
              const candidateData = await searchGithubUser(candidates[currentIndex].login);
              setCurrentCandidate(candidateData);
              setLoading(false);
            }
      fetchCandidateDetails();
    }
    }, [currentIndex, candidates]);

  const SaveCandidate = () => {
    if (currentCandidate) {
     const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates')|| '[]');
     savedCandidates.push(currentCandidate);
     localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    showNextCandidate();
  };
  console.log("loading", loading);
const showNextCandidate = () => {
  setCurrentIndex((prevIndex)=> (prevIndex+1) % candidates.length);
  };
   
  return(
    <div className='container'>
      <h1>Candidate Search</h1>
        {loading ? (
        <p>Loading candidate details...</p>
      ) : currentCandidate ? (
        <div className="card">
          <div className="card-content">
            <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login}'s avatar`} />
            <p><strong>Name:</strong> {currentCandidate.name || currentCandidate.login}</p>
          </div>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
      <button onClick={SaveCandidate}>Save Candidate</button>
      <button onClick={showNextCandidate}>Next Candidate</button>
    </div>
    );
  }
export default CandidateSearch;
