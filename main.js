import './style.css'
import { createClient } from '@supabase/supabase-js'

const options = {
  schema: 'public',
  headers: { 'x-my-custom-header': 'my-app-name' },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
}
const supabase = createClient(
  "https://rbuknbtxdlofhfdstoss.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidWtuYnR4ZGxvZmhmZHN0b3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTAzNTM2NDIsImV4cCI6MTk2NTkyOTY0Mn0.LFd4K9s2AEap_dbXKZBuD9H9eKwXszyJBEjp0V0wsOU",
  options 
);

const playerTemplate = document.getElementById('player-template');
const players = document.querySelector('.players');

function createPlayer(player)
{
  const playerElement = document.importNode(playerTemplate.content, true);
  
  const playerNameElement = playerElement.querySelector('.name');
  const playerScoreElement = playerElement.querySelector('.score');

  playerNameElement.textContent = player.name;
  playerScoreElement.textContent = player.points;

  players.appendChild(playerElement);
}

supabase.from('players').select('*').then(res => {
  const data = res.data.sort((a, b) => b.points - a.points);
  data.forEach(player => createPlayer(player));
});