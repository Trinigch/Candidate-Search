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
          
            <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login}'s avatar`} />
            <div className="card-content">
              <h2>{currentCandidate.name}</h2>
            <p><strong>Username:</strong> {currentCandidate.login ||'N/A'}</p>
            <p><strong>Location:</strong> {currentCandidate.location  || 'N/A' }</p>
            <p><strong>Email:</strong> {currentCandidate.email  || 'N/A' }</p>
            <p><strong>Company:</strong> {currentCandidate.company || 'N/A'}</p>
            <p><strong>Id:</strong> {currentCandidate.id || 'N/A'}</p>
            <p><strong>html_url</strong> {currentCandidate.html_url  || 'N/A'}</p>
          </div>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
       <div className="button-container">
      <button className="button button--save" onClick={SaveCandidate}> + </button>
      <button className="button button--next" onClick={showNextCandidate}> - </button>
      </div>
    </div>
    );
  }
export default CandidateSearch;
