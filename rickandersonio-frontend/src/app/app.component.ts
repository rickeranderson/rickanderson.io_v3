import { Component } from '@angular/core';
import { Profile } from './models/profile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RickAnderson.io';

  date = new Date();

  profile: Profile;

  constructor() { }

  ngOnInit(){
    let languageSkills = {
      name: 'Languages',
      items: [
        'Java',
        'Beanshell', 
        'TypeScript', 
        'Javascript', 
        'C#', 
        'PHP', 
        'Python', 
        'HTML', 
        'CSS', 
        'C', 
        'SQL'
      ]
    }

    let techSkills = {
      name: 'Technologies/Frameworks',
      items: [
        'SailPoint IdentityIQ', 
        'Windows', 
        'Linux', 
        'macOS', 
        'Angular', 
        'ASP.Net', 
        '.Net Core', 
        'Git', 
        'VisualStudio', 
        'VSCode',
        'Microsoft IIS', 
        'Azure DevOps', 
        'Apache Tomcat',
        'Octopus Deploy',
        'JetBrains TeamCity'
      ]
    }

    let awsExperience = {
      name: 'AWS Experience',
      items: [
        'EC2',
        'Lambda', 
        'Elastic Beanstalk', 
        'S3', 
        'RDS', 
        'CloudFront', 
        'Route53', 
        'API Gateway', 
        'CloudWatch',
        'CloudFormation', 
        'IAM', 
        'SNS', 
        'SES'
      ]
    }

    this.profile = {
      name: 'Rick Anderson',
      education: [
        '2017 - Computer Science, B.S. - Boise State University'
      ],
      employment: [
        '2022 - Present, Software Engineer III, J.R. Simplot Company',
        '2021 - 2022, Software Engineer II, J.R. Simplot Company',
        '2017 - 2021, Software Engineer, Boise State University - Enterprise Application Development',
        '2016 - 2017, Student Developer, Boise State University'
      ],
      skills: [
        languageSkills,
        techSkills,
        awsExperience
      ]
    }
  }
}
