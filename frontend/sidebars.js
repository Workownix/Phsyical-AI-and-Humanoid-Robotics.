module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: true,
      collapsed: false,
      items: [
        'intro',
        'learning-outcomes',
        'hardware-requirements',
        'assessments'
      ]
    },
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      link: { type: 'generated-index' },
      collapsible: true,
      collapsed: false,
      items: [
        'module-1/introduction',
        'module-1/chapter-1-intro-ros2',
        'module-1/chapter-2-nodes-topics',
        'module-1/chapter-3-services-actions-parameters',
        'module-1/chapter-4-urdf-robot-modeling',
        'module-1/chapter-5-launch-files-packages',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      link: { type: 'generated-index' },
      collapsible: true,
      collapsed: true,
      items: [
        'module-2/introduction',
        'module-2/week-6-7/gazebo-simulation-part-1',
        'module-2/week-6-7/gazebo-simulation-part-2',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
      link: { type: 'generated-index' },
      collapsible: true,
      collapsed: true,
      items: [
        'module-3/introduction',
        'module-3/week-8-10/isaac-platform-part-1',
        'module-3/week-8-10/isaac-platform-part-2',
        'module-3/week-8-10/isaac-platform-part-3',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      link: { type: 'generated-index' },
      collapsible: true,
      collapsed: true,
      items: [
        'module-4/introduction',
        'module-4/week-11-12/humanoid-development-part-1',
        'module-4/week-11-12/humanoid-development-part-2',
        'module-4/week-13/conversational-robotics',
      ],
    },
  ],
};
