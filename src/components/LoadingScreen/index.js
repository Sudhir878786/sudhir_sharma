import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const glitch = keyframes`
  0% {
    text-shadow: 2px 0 #00ff00, -2px 0 #ff0000;
  }
  25% {
    text-shadow: -2px 0 #00ff00, 2px 0 #ff0000;
  }
  50% {
    text-shadow: 2px 0 #ff0000, -2px 0 #00ff00;
  }
  75% {
    text-shadow: -2px 0 #ff0000, 2px 0 #00ff00;
  }
  100% {
    text-shadow: 2px 0 #00ff00, -2px 0 #ff0000;
  }
`;

const scrollUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const scrollDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const scrollLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const scrollRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  overflow: hidden;
  animation: ${({ $isExiting }) => $isExiting ? fadeOut : 'none'} 0.5s ease-out forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.03) 25%, rgba(0, 255, 0, 0.03) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.03) 75%, rgba(0, 255, 0, 0.03) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.03) 25%, rgba(0, 255, 0, 0.03) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.03) 75%, rgba(0, 255, 0, 0.03) 76%, transparent 77%, transparent);
    background-size: 50px 50px;
    opacity: 0.2;
    pointer-events: none;
  }
`;

const MatrixBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.25;
`;

const CodeColumn = styled.div`
  position: absolute;
  top: ${props => props.$top || 0}%;
  left: ${props => props.$left || 0}%;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #4ec9b0;
  white-space: nowrap;
  animation: ${props => {
    if (props.$direction === 'up') return scrollUp;
    if (props.$direction === 'down') return scrollDown;
    if (props.$direction === 'left') return scrollLeft;
    return scrollRight;
  }} ${props => props.$duration || 10}s linear infinite;
  opacity: 0.8;
  text-shadow: 0 0 5px rgba(78, 201, 176, 0.5);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const KaliLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) saturate(100%) invert(76%) sepia(13%) saturate(1586%) hue-rotate(119deg) brightness(93%) contrast(91%);
  }
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const NameText = styled.h1`
  font-size: 120px;
  font-weight: 900;
  color: #4ec9b0;
  font-family: 'Courier New', monospace;
  margin: 0;
  letter-spacing: 8px;
  text-shadow: 
    0 0 20px #4ec9b0,
    0 0 40px #4ec9b0,
    0 0 60px #4ec9b0,
    0 0 80px rgba(78, 201, 176, 0.5);
  animation: ${glitch} 3s infinite;
  position: relative;
  
  &::before {
    content: '> ';
    color: #4ec9b0;
  }
  
  &::after {
    content: '_';
    animation: ${blink} 1s infinite;
    margin-left: 5px;
  }
  
  @media (max-width: 768px) {
    font-size: 60px;
    letter-spacing: 4px;
  }
`;

const TaglineContainer = styled.div`
  margin-top: 30px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RotatingText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #4ec9b0;
  font-family: 'Courier New', monospace;
  animation: ${fadeIn} 0.5s ease-out;
  text-align: center;
  text-shadow: 0 0 15px rgba(78, 201, 176, 0.8);
  letter-spacing: 2px;
  
  &::before {
    content: '$ ';
    color: #dcdcaa;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const LoadingBar = styled.div`
  width: 500px;
  height: 3px;
  background: rgba(78, 201, 176, 0.15);
  margin-top: 40px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(78, 201, 176, 0.4);
  box-shadow: 0 0 10px rgba(78, 201, 176, 0.2);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #4ec9b0, transparent);
    animation: ${scrollRight} 1.5s linear infinite;
    box-shadow: 0 0 10px #4ec9b0;
  }
  
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const TerminalWindow = styled.div`
  margin-top: 50px;
  padding: 20px;
  background: rgba(30, 30, 30, 0.9);
  border: 2px solid #4ec9b0;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  color: #4ec9b0;
  text-align: left;
  box-shadow: 0 0 30px rgba(78, 201, 176, 0.4);
  min-width: 400px;
  
  @media (max-width: 768px) {
    min-width: 280px;
    padding: 15px;
    font-size: 12px;
  }
`;

const TerminalLine = styled.div`
  margin: 5px 0;
  color: #ce9178;
  
  &::before {
    content: '> ';
    color: #dcdcaa;
  }
`;

const TerminalPrompt = styled.div`
  color: #4ec9b0;
  font-weight: bold;
  
  &::after {
    content: '_';
    animation: ${blink} 1s infinite;
    margin-left: 5px;
  }
`;

const features = [
  '☁️ Cloud Solutions Architect',
  '⚛️ Full Stack Developer',
  '🤖 AI & Machine Learning Engineer',
  '🔧 Microservices Expert',
  '📊 Big Data & Analytics',
  '🚀 DevOps & CI/CD Specialist',
  '💾 Database Optimization',
  '🎯 Problem Solver & Innovator'
];

const codeSnippets = [
  'npm install --save react redux\n',
  'docker-compose up -d --build\n',
  'kubectl apply -f deployment.yaml\n',
  'git push origin main --force\n',
  'terraform apply -auto-approve\n',
  'pip install tensorflow pandas numpy\n',
  'mvn clean install -DskipTests\n',
  'cargo build --release --verbose\n',
  'az login --tenant microsoft.com\n',
  'aws s3 sync ./dist s3://bucket\n',
  'gcloud compute instances create vm\n',
  'helm install myapp ./chart\n',
  'yarn add @azure/cosmos mongodb\n',
  'psql -U admin -d production\n',
  'redis-cli --cluster create nodes\n',
  'mongosh --host cluster.mongodb\n',
  'systemctl restart nginx.service\n',
  'journalctl -u apache2 -f\n',
  'pm2 start server.js --name api\n',
  'netstat -tulpn | grep LISTEN\n',
  'top -o %CPU -n 10 | head -20\n',
  'df -h | grep /dev/sda1\n',
  'du -sh /var/log/* | sort -hr\n',
  'find / -name "*.log" -mtime +7\n',
  'grep -r "ERROR" /var/log/\n',
  'awk {print $1,$4} access.log\n',
  'sed -i s/localhost/0.0.0.0/g\n',
  'curl -X POST https://api.github\n',
  'wget https://releases.ubuntu.com\n',
  'scp user@server:/backup.tar.gz\n',
  'ssh -i key.pem ubuntu@ec2-host\n',
  'chmod 600 ~/.ssh/id_rsa\n',
  'chown -R www-data:www-data\n',
  'tar -xzf archive.tar.gz -C /opt\n',
  'rsync -avz /src/ /backup/\n',
  'iptables -A INPUT -p tcp --dport\n',
  'ufw allow 443/tcp comment https\n',
  'fail2ban-client status sshd\n',
  'certbot --nginx -d domain.com\n',
  'nmap -sV -sC 192.168.1.0/24\n',
];

const LoadingScreen = ({ onLoadComplete }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [codeColumns, setCodeColumns] = useState([]);

  useEffect(() => {
    // Generate random code columns with various terminal commands
    const columns = [];
    for (let i = 0; i < 40; i++) {
      const randomSnippets = [];
      const snippetCount = 15 + Math.floor(Math.random() * 10);
      for (let j = 0; j < snippetCount; j++) {
        randomSnippets.push(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
      }
      
      columns.push({
        id: i,
        code: randomSnippets.join(''),
        top: Math.random() * 150 - 25,
        left: Math.random() * 120 - 10,
        direction: ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)],
        duration: 20 + Math.random() * 30
      });
    }
    setCodeColumns(columns);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    const loadingTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onLoadComplete) onLoadComplete();
      }, 500);
    }, 4000);

    return () => {
      clearInterval(featureInterval);
      clearTimeout(loadingTimer);
    };
  }, [onLoadComplete]);

  return (
    <LoadingContainer $isExiting={isExiting}>
      <MatrixBackground>
        {codeColumns.map(col => (
          <CodeColumn
            key={col.id}
            $top={col.top}
            $left={col.left}
            $direction={col.direction}
            $duration={col.duration}
          >
            {col.code}
          </CodeColumn>
        ))}
      </MatrixBackground>

      <ContentWrapper>
        <KaliLogo>
          <img src="https://www.kali.org/images/kali-dragon-icon.svg" alt="Kali Linux" />
        </KaliLogo>
        
        <NameText>SUDHIR</NameText>
        
        <TaglineContainer>
          <RotatingText key={currentFeature}>
            {features[currentFeature]}
          </RotatingText>
        </TaglineContainer>

        <LoadingBar />

        <TerminalWindow>
          <TerminalLine>Initializing system...</TerminalLine>
          <TerminalLine>Loading modules: [OK]</TerminalLine>
          <TerminalLine>Connecting to server: [OK]</TerminalLine>
          <TerminalPrompt>root@portfolio:~#</TerminalPrompt>
        </TerminalWindow>
      </ContentWrapper>
    </LoadingContainer>
  );
};

export default LoadingScreen;
